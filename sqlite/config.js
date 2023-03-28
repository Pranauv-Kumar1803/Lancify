/*eslint-disable*/
const sqlite = require('sqlite3');
const db = new sqlite.Database('./sqlite/data/try.db');

const initializedb = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('create table if not exists users ( username VARCHAR(50) not null, email varchar(100) not null unique, password varchar(50), user_id varchar(50) primary key, user_type varchar(10), user_img varchar(65520))');

      db.run('create table if not exists services (service_type varchar(20), seller_type varchar(50), seller_id varchar(50), main_img varchar(65520), service_desc varchar(300), min_duration int, service_title varchar(60), rating int, starting_price int,FOREIGN KEY (seller_id) REFERENCES users(user_id) )')

      db.run(' create table if not exists sellers ( seller_id varchar(50), seller_fname varchar(100), seller_lname varchar(100), seller_desc varchar(150), seller_from datetime, occupation varchar(50), country varchar(50), institute varchar(100), degree_title varchar(20), degree_major varchar(100), year_education int, portfolio_website varchar(100), github varchar(100), StackOverflow varchar(100), linkedin varchar(100), languages varchar(150) , FOREIGN KEY(seller_id) REFERENCES users(user_id) ) ')
    })
    resolve({ message: 'success' })
  })
}

const insertUser = (obj) => {
  return new Promise((resolve, reject) => {
    if (!obj.name && !obj.email && !obj.password) {
      reject({ message: 'invalid input', status: '403' })
    }
    else {
      db.run('insert into users (user_id,username,email,password) values (?,?,?,?)', [obj.uuid, obj.name, obj.email, obj.password], (err) => {
        if (err) {
          reject({ message: 'not able to insert', status: '500' })
        }
        else {
          resolve({ message: 'success', status: '201', data: obj })
        }
      });
    }
  })
}

const insertSeller = (obj) => {
  console.log(obj);
  return new Promise((resolve, reject) => {
    if (!obj.seller_id) {
      reject({ message: 'invalid input', status: '403' })
    }
    else {
      console.log('inside main');
      db.run('insert into sellers values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [obj.seller_id, obj.fname, obj.lname, obj.desc, new Date().toISOString().slice(0, 19).replace('T', ' '), obj.occupation, obj.country, obj.institute_name, obj.title, obj.major, obj.year, obj.portfolio, obj.github, obj.stack, obj.linkedin, obj.languages.toString()], (err) => {
        if (err) {
          console.log(err);
          reject({ message: 'not able to insert', status: '500' })
        }
        else {
          console.log('in');
          db.run(`update users set user_type='seller' , user_img='${obj.profile}' where user_id='${obj.seller_id}'`, (err) => {
            if (err) {
              console.log(err);
              reject({ message: 'not able to insert', status: '500' })
            }
            resolve({ message: 'success', status: '201', data: obj })
          })
        }
      });
    }
  })
}


const getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.all('select * from users', (err, rows) => {
      if (err) {
        reject({ message: 'error in fetching', status: 500 })
      }
      else {
        resolve({ data: rows, status: 200 })
      }
    });
  })
}

const getSomeUser = async (email) => {
  return new Promise((resolve, reject) => {
    db.all(`select * from users where email=?`, email, (err, rows) => {
      if (err) {
        reject({ message: 'error in fetching', status: 500, data: rows })
      }
      else {
        resolve({ data: rows, status: 200 })
      }
    });
  })
}

const getDomainBasedService = async (type) => {
  return new Promise((resolve, reject) => {
    db.all(`select * from services s,users u where s.seller_id=u.user_id and u.user_type='seller' and s.domain_type='${type.domain}' and s.service_type='${type.service}'`, (err, rows) => {
      if (err) {
        reject({ message: 'error in fetching', status: 500, data: rows })
      }
      else {
        resolve({ data: rows, status: 200 })
      }
    });
  })
}

const getServiceBasedOnQuery = async (obj) => {
  return new Promise((resolve, reject) => {
    const min = obj.query.min;
    const max = obj.query.max;
    if (obj.query.days) {
      db.all(`select * from services s,users u where s.seller_id=u.user_id and u.user_type='seller' and s.service_type='${obj.domain}' and s.min_duration <= ${obj.query.days} and s.starting_price >= ${min} and s.starting_price <= ${max}`, (err, rows) => {
        if (err) {
          reject({ message: 'error in fetching', status: 500, data: rows })
        }
        else {
          resolve({ data: rows, status: 200 })
        }
      });
    }
    else {
      db.all(`select * from services s,users u where s.seller_id=u.user_id and u.user_type='seller' and s.service_type='${obj.domain}' and s.starting_price >= ${min} and s.starting_price <= ${max}`, (err, rows) => {
        if (err) {
          reject({ message: 'error in fetching', status: 500, data: rows })
        }
        else {
          resolve({ data: rows, status: 200 })
        }
      });
    }
  })
}

const close = () => {
  db.close();
}

module.exports = { initializedb, insertUser, insertSeller, getAllUser, getSomeUser, getDomainBasedService, getServiceBasedOnQuery, close }
