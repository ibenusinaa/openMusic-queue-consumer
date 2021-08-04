const { Pool } = require('pg')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylists (userId) {
    const query = {
      text: `SELECT a.id, a.name, users.username 
      FROM (SELECT playlists.* FROM playlists
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
      WHERE playlists.owner = $1 OR collaborations.user_id = $1
      GROUP BY playlists.id) a LEFT JOIN users ON users.id = a.owner`,
      values: [userId]
    }

    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = PlaylistsService
