import pg from 'pg';

const { Pool } = pg;

const config = {
    host:"localhost",
    post: 5432,
    user: "postgres",
    password: "123456",
    database: "sing_me_a_song"
}
const connection = new Pool(config);

export default connection;