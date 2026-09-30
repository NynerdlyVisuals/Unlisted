import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const API = 'http://localhost:3001'

function Admin() {

  const [transmissions, setTransmissions] = useState([])
  const [number, setNumber] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [deletingTransmission, setDeletingTransmission] = useState(null)
  const [loading, setLoading] = useState(false)

  async function loadTransmissions() {

    try {
      const response = await fetch(`${API}/transmissions`)

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()
      setTransmissions(data)

    } catch {

      toast.error('ADMIN SERVER OFFLINE')

    }

  }

  useEffect(() => {
    loadTransmissions()
  }, [])

  function resetForm() {

    setNumber('')
    setDescription('')
    setContent('')
    setImage(null)
    setEditingId(null)

  }

  async function saveTransmission() {

    if (!number || !description.trim() || !content.trim()) {
      toast.error('COMPLETE ALL FIELDS')
      return

    }

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('number', number)
      formData.append('description', description)
      formData.append('content', content)

      if (image) {
        formData.append('image', image)
      }

      const url =
        editingId !== null
          ? `${API}/transmissions/${editingId}`
          : `${API}/transmissions`

      const response = await fetch(url, {
        method: editingId !== null ? 'PUT' : 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {

        if (response.status === 409) {

          toast.error('TRANSMISSION NUMBER ALREADY EXISTS')
          return

        }

        throw new Error(result.error)

      }

      toast.success(
        editingId !== null
          ? 'TRANSMISSION UPDATED'
          : 'TRANSMISSION PUBLISHED'
      )

      resetForm()
      await loadTransmissions()

    } catch {

      toast.error('SAVE FAILED')

    } finally {

      setLoading(false)

    }

  }

  function editTransmission(transmission) {

    setEditingId(transmission.id)
    setNumber(String(transmission.id))
    setDescription(transmission.description)
    setContent(transmission.content)
    setImage(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  }

  async function deleteTransmission() {

    if (!deletingTransmission) {
      return
    }

    try {

      const response = await fetch(
        `${API}/transmissions/${deletingTransmission.id}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error()
      }

      toast.success('TRANSMISSION DELETED')

      if (editingId === deletingTransmission.id) {
        resetForm()
      }

      setDeletingTransmission(null)
      await loadTransmissions()

    } catch {

      toast.error('DELETE FAILED')

    }

  }

  return (

    <div className="p-6 md:p-20">

      <h1 className="text-[42px] md:text-[80px] font-bold">
        ADMIN
      </h1>

      <p className="mt-5">
        // TRANSMISSION MANAGEMENT
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

        {/* FORM */}

        <div className="border-2 border-black p-5 md:p-8">

          <h1>
            {editingId !== null
              ? 'Edit Transmission'
              : 'Create Transmission'
            }
          </h1>

          <div className="flex flex-col gap-5 mt-10">

            <div>

              <p className="mb-2">
                // TRANSMISSION NUMBER
              </p>

              <input
                type="number"
                min="1"
                placeholder="001"
                value={number}
                onChange={(event) =>
                  setNumber(event.target.value)
                }
                className="border-2 border-black p-4 bg-transparent outline-none w-full"
              />

            </div>

            <textarea
              placeholder="Short description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              className="border-2 border-black p-4 bg-transparent outline-none resize-none h-24 w-full"
            />

            <textarea
              placeholder="Transmission content"
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              className="border-2 border-black p-4 bg-transparent outline-none resize-none h-60 w-full"
            />

            <div>

              <p className="mb-2">
                // IMAGE [OPTIONAL]
              </p>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(event) =>
                  setImage(event.target.files[0])
                }
                className="border-2 p-4 w-full max-w-full"
              />

              {editingId !== null && (

                <p className="mt-2 text-xs">
                  Leave empty to keep the current image.
                </p>

              )}

            </div>

            <button
              onClick={saveTransmission}
              disabled={loading}
              className="primary"
            >

              {loading
                ? 'SAVING...'
                : editingId !== null
                  ? 'SAVE CHANGES →'
                  : 'PUBLISH TRANSMISSION →'
              }

            </button>

            {editingId !== null && (

              <button
                onClick={resetForm}
                className="link"
              >
                CANCEL EDIT →
              </button>

            )}

          </div>

        </div>

        {/* SAVED TRANSMISSIONS */}

        <div className="border-2 border-black p-5 md:p-8">

          <h1>
            Saved Transmissions
          </h1>

          <p className="mt-5">
            TRANSMISSIONS [{transmissions.length}]
          </p>

          <div className="mt-10 max-h-150 overflow-y-auto pr-2">

            {transmissions.map((transmission) => (

              <div
                key={transmission.id}
                className="p-3 md:p-5 mb-5"
              >
                {transmission.image && (

                  <img
                    src={`${import.meta.env.BASE_URL}${transmission.image.replace(/^\//, '')}`}
                    alt={transmission.title}
                    className="w-full h-40 object-cover mb-5"
                  />

                )}

                <p className="font-bold">
                  {transmission.title}
                </p>

                <p className="mt-2">
                  {transmission.description}
                </p>

                <p className="mt-2 text-black/50">
                  {transmission.recovered}
                </p>

                <div className="flex flex-wrap gap-5 mt-5">

                  <button
                    className="link"
                    onClick={() =>
                      editTransmission(transmission)
                    }
                  >
                    EDIT
                  </button>

                  <button
                    className="link"
                    onClick={() =>
                      setDeletingTransmission(transmission)
                    }
                  >
                    DELETE
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* DELETE MODAL */}

      {deletingTransmission && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-[#BA0739] border-2 border-black p-6 md:p-10 w-full max-w-137">

            <h2>
              DELETE TRANSMISSION //{' '}
              {String(deletingTransmission.id).padStart(3, '0')}?
            </h2>

            <p className="mt-5">
              This action cannot be undone.
            </p>

            <div className="flex flex-wrap gap-5 mt-8">

              <button
                className="link"
                onClick={() =>
                  setDeletingTransmission(null)
                }
              >
                CANCEL
              </button>

              <button
                className="link"
                onClick={deleteTransmission}
              >
                DELETE 
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default Admin