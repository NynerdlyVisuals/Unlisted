import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transmissionsPath = path.join(__dirname, "../src/data/transmissions.js");

const uploadsPath = path.join(__dirname, "../public/transmissions");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, {
    recursive: true,
  });
}

// Local admin access

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const number = String(req.body.number).padStart(3, "0");

    cb(null, `transmission-${number}-${Date.now()}${extension}`);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Unsupported image format"));
    }

    cb(null, true);
  },
});

async function readTransmissions() {
  const fileUrl = pathToFileURL(transmissionsPath).href;
  const module = await import(`${fileUrl}?update=${Date.now()}`);

  return module.default;
}

function saveTransmissions(transmissions) {
  const content = `const transmissions = ${JSON.stringify(
    transmissions,
    null,
    2,
  )}

export default transmissions
`;

  fs.writeFileSync(transmissionsPath, content, "utf8");
}

function deleteImage(image) {
  if (!image) {
    return;
  }

  const filename = path.basename(image);
  const imagePath = path.join(uploadsPath, filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
}

// Get transmissions

app.get("/transmissions", async (req, res) => {
  try {
    const transmissions = await readTransmissions();

    res.json(transmissions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to read transmissions",
    });
  }
});

// Create transmission

app.post("/transmissions", upload.single("image"), async (req, res) => {
  try {
    const { number, description, content } = req.body;

    const id = Number(number);

    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !description?.trim() ||
      !content?.trim()
    ) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        error: "Invalid fields",
      });
    }

    const transmissions = await readTransmissions();

    const alreadyExists = transmissions.some(
      (transmission) => transmission.id === id,
    );

    if (alreadyExists) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(409).json({
        error: "Transmission number already exists",
      });
    }

    const formattedNumber = String(id).padStart(3, "0");

    const date = new Date().toLocaleDateString("en-GB").replace(/\//g, ".");

    const newTransmission = {
      id,
      recovered: `RECOVERED // ${date}`,
      title: `TRANSMISSION // ${formattedNumber}`,
      description: description.trim(),
      content: content.trim(),
      image: req.file ? `/transmissions/${req.file.filename}` : null,
    };

    transmissions.push(newTransmission);
    transmissions.sort((a, b) => a.id - b.id);
    saveTransmissions(transmissions);

    res.status(201).json(newTransmission);
  } catch (error) {
    console.error(error);

    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch {}
    }

    res.status(500).json({
      error: "Unable to create transmission",
    });
  }
});

// Edit transmission

app.put("/transmissions/:id", upload.single("image"), async (req, res) => {
  try {
    const oldId = Number(req.params.id);
    const { number, description, content } = req.body;
    const newId = Number(number);

    if (
      !Number.isInteger(newId) ||
      newId <= 0 ||
      !description?.trim() ||
      !content?.trim()
    ) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        error: "Invalid fields",
      });
    }

    const transmissions = await readTransmissions();
    const transmission = transmissions.find((item) => item.id === oldId);

    if (!transmission) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(404).json({
        error: "Transmission not found",
      });
    }

    const duplicate = transmissions.some(
      (item) => item.id === newId && item.id !== oldId,
    );

    if (duplicate) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(409).json({
        error: "Transmission number already exists",
      });
    }

    if (req.file) {
      deleteImage(transmission.image);

      transmission.image = `/transmissions/${req.file.filename}`;
    }

    transmission.id = newId;
    transmission.title = `TRANSMISSION // ${String(newId).padStart(3, "0")}`;
    transmission.description = description.trim();
    transmission.content = content.trim();
    transmissions.sort((a, b) => a.id - b.id);

    saveTransmissions(transmissions);

    res.json(transmission);
  } catch (error) {
    console.error(error);

    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch {}
    }

    res.status(500).json({
      error: "Unable to edit transmission",
    });
  }
});

// Delete transmission

app.delete("/transmissions/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const transmissions = await readTransmissions();
    const transmission = transmissions.find((item) => item.id === id);

    if (!transmission) {
      return res.status(404).json({
        error: "Transmission not found",
      });
    }

    deleteImage(transmission.image);

    const updatedTransmissions = transmissions.filter((item) => item.id !== id);

    saveTransmissions(updatedTransmissions);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to delete transmission",
    });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`UNLISTED ADMIN // http://localhost:${PORT}`);
});
