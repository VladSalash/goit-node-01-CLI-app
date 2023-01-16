const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname,'./db/contacts.json')

async function updateContacts(contact){
  await fs.writeFile(contactsPath,JSON.stringify(contact, null, 2))
}



//  LIST_CONTACTS
async function listContacts() {
    
  const data = await fs.readFile(contactsPath,{encoding: 'utf-8'}, function(err) {
    if (err) throw err;
  })
  const contacts = JSON.parse(data);
  return contacts;
  
}

  // ID_CONTACTS
 async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contId = contacts.find(contact => contact.id === contactId)
    if(!contId){
      return null
    }
    return contId;
  } catch (error) {
    console.error(error);
  }
  
}
 //  ADD_CONTACTS
 async function addContact(name, email, phone) {
  try{
    const contacts = await listContacts();
    const newContact = {
    id: uuidv4(),
     name,
     email,
     phone,
   };
   contacts.push(newContact)
     await updateContacts(contacts)
     return newContact;
  }catch (error) {
    console.error(error);
  }
  }

  
  //  REMOVE_CONTACTS
 async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedDb = contacts.filter((contact) => contact.id !== contactId);
  await updateContacts(updatedDb)
  return updatedDb;
  } catch (error) {
    console.error(error);
  }

  }
  
 

 module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    }


    