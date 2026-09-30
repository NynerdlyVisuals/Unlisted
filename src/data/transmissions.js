const transmissions = [
  {
    id: 1,
    recovered: "RECOVERED // 19.09.2026",
    title: "TRANSMISSION // 001",
    description: "Three unidentified profiles appeared inside the archive. No source. No trace. No explanation.",
    content: "At 03:17, an anomaly was detected inside the archive.\r\n\r\nThree unidentified profiles appeared simultaneously across the archive. No upload was detected, no account was created, and no external connection was recorded. According to the system logs, the profiles had never entered the archive.\r\n\r\nThey were simply there.\r\n\r\nEach profile contained fragments of corrupted data: incomplete identities, missing timestamps and records referencing events that do not exist anywhere else in the system. We attempted to isolate the files, but access was denied. Attempts to trace their origin returned no source.\r\n\r\nAt 03:24, all three profiles were manually deleted. For eleven seconds, the archive returned to normal.\r\n\r\nThen they came back.\r\n\r\nSame identities. Same corrupted records. Except this time, something had changed.\r\n\r\nA new message had appeared inside the archive:\r\n\r\n\"YOU MISSED SOMETHING.\"\r\n\r\nThe profiles remain active. Their origin is still unknown.\r\n\r\nFurther investigation required.\r\n\r\nNEXT TRACE // ../CHARACTERS",
    image: "/transmissions/transmission-001-1789811729412.png"
  },

  {
    id: 2,
    recovered: "RECOVERED // 28.09.2026",
    title: "TRANSMISSION // 002",
    description: "A sequence of location traces was recovered. One interval is missing.",
    content: "A new fragment has been recovered from the archive.\r\n\r\nThe record appears to track the movement of one of the unidentified profiles across several sectors. Multiple entries survived the corruption, each confirming the presence of the same subject at different points in time.\r\n\r\nThe sequence should be complete.\r\n\r\nIt isn’t.\r\n\r\nOne interval contains no readable record. No location. No timestamp. No movement data. The archive recognizes that something existed between the surrounding entries, but whatever occupied that position has been removed from the sequence.\r\n\r\nAttempts to reconstruct the missing trace continue to return incomplete results. What remains may still be enough to determine where the subject moved, and what disappeared from the record.\r\n\r\nThe anomaly has been linked to HIRO.\r\n\r\nSTATUS // TRACE INCOMPLETE\r\nSUBJECT // HIRO\r\nRECOVERY // PARTIAL\r\nMISSING RECORD // DETECTED\r\n\r\nThe surviving fragments have been transferred to the investigation terminal.\r\n\r\nPATH // ../MISSIONS/HIRO",
    image: "/transmissions/transmission-002-1790605766818.png"
  },

  {
    id: 3,
    recovered: "RECOVERED // 28.09.2026",
    title: "TRANSMISSION // 003",
    description: "An unidentified signal has been detected beyond the archive’s mapped sectors.",
    content: "The archive received a signal from outside its known sector map.\r\n\r\nAt first, the transmission was classified as noise. No registered device, account or internal process could be connected to its source. Seconds later, the signal returned.\r\n\r\nThen again.\r\n\r\nEach transmission contained fragments of data, but none arrived intact. Portions overlap. Others appear in the wrong position. Several fragments may belong to the same original message, although the archive has been unable to reconstruct it automatically.\r\n\r\nMore concerning is the origin.\r\n\r\nAccording to the system map, there is nothing beyond the sector from which the signal was detected. No active node should exist there. No transmission should be capable of originating from that location.\r\n\r\nOne profile appears repeatedly within the recovered metadata.\r\n\r\nYOKO.\r\n\r\nWhether she transmitted the signal, received it, or was simply present when it appeared remains unknown.\r\n\r\nSTATUS // SIGNAL ACTIVE\r\nSUBJECT // YOKO\r\nORIGIN // UNMAPPED\r\nRECONSTRUCTION // FAILED\r\n\r\nManual reconstruction has been authorized.\r\n\r\nPATH // ../MISSIONS/YOKO",
    image: "/transmissions/transmission-003-1790606208745.png"
  },

  {
    id: 4,
    recovered: "RECOVERED // 28.09.2026",
    title: "TRANSMISSION // 004",
    description: "An access event was recorded. Moments later, the record disappeared.",
    content: "An unauthorized access event was detected inside the archive.\r\n\r\nFor a brief period, the system registered an active presence within a restricted sector. The access was real. Internal monitoring confirmed it. A record was generated automatically.\r\n\r\nThen the record disappeared.\r\n\r\nNot corrupted. Not relocated.\r\n\r\nRemoved.\r\n\r\nThe archive retains traces proving that the event occurred, but the primary record associated with it can no longer be found. No account initiated the access. No valid credentials were used. No creation event exists for the missing record.\r\n\r\nOne fragment survived the deletion.\r\n\r\nIt contains a reference to AKIRA.\r\n\r\nThe connection is unclear. She may have accessed the sector, been detected inside it, or become part of the record before it vanished.\r\n\r\nWhatever happened, something entered the archive without leaving a complete history behind.\r\n\r\nSTATUS // GHOST ACCESS\r\nSUBJECT // AKIRA\r\nRECORD // MISSING\r\nACCESS SOURCE // UNKNOWN\r\n\r\nResidual data remains available for investigation.\r\n\r\nPATH // ../MISSIONS/AKIRA",
    image: "/transmissions/transmission-004-1790606248863.png"
  },

  {
    id: 5,
    recovered: "RECOVERED // 28.09.2026",
    title: "TRANSMISSION // 005",
    description: "External communication nodes connected to UNLISTED® have been identified.",
    content: "External nodes have been established outside the archive.\r\n\r\nThese channels do not contain recovered records and are not part of the investigation itself. They provide access to development updates, community discussions, system reports and information surrounding UNLISTED®.\r\n\r\nIf an anomaly is discovered inside the archive, a mission fails to behave as expected, or further communication is required, use one of the available external nodes.\r\n\r\nDISCORD // COMMUNITY ACCESS\r\nX // SYSTEM UPDATES\r\nGITHUB // SOURCE & ISSUE REPORTS\r\n\r\nAdditional nodes may become available as the archive expands.\r\n\r\nNETWORK STATUS // ONLINE\r\nEXTERNAL ACCESS // AUTHORIZED\r\nCONNECTION // STABLE\r\n\r\nThe archive is no longer isolated.",
    image: null
  }
]

export default transmissions
