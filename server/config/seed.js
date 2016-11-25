/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Livre from '../api/livre/livre.model';
import Cat from '../api/cat/cat.model';
import Syllabus from '../api/syllabus/syllabus.model';



Syllabus.find({}).remove()
  .then(() => {
    Syllabus.create({
      _id : '5830916fcb77070c40f07c9c',
 academy : 'UAHB',
 year : 2016,
 title : 'Mean',
 education : 'info',
 lecturer : 'pach',
 owner : '5830916fcb77070c40f07c9d'
   });
    });

Cat.find({}).remove()
  .then(() => {
    Cat.create({
      name: 'Development Tools',
      age: 12,
      color: 'jaune' 
    },
    {
      name: 'benen Tools',
      age: 12,
      color: 'orange' 
    });
  });

Livre.find({}).remove()
  .then(() => {
    Livre.create({
      _id : '5830916fcb77070c40f07c9c',
      titre : 'déh',
  auteur : 'pach',
  editeur : 'putin',
  owner : '5830916fcb77070c40f07c9d'
    })
    .then(() => {
      console.log('finished populating livres');
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    },
    {
      _id : '5830916fcb77070c40f07c9d',
      provider: 'local',
      role: 'admin',
      name: 'pach',
      email: 'pach@pach.com',
      password: 'pass'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
