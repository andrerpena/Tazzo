import massive from 'massive';
import config from '../../../config/config';

let db;

export default function () {
    if (db) return Promise.resolve(db);
    return massive(config.db.massiveConnectionObject)
        .then((m) => { db = m; return m; });
}
