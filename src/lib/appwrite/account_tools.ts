import { Client, Account } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('6797a173001454cd8f4b'); // Replace with your Appwrite project ID

// Create a new account
async function createAccount(email: string, password: string, name: string) {
  try {
    const account = new Account(client);
    const response = await account.create(
      email,
      password,
      name,
    ); 
    console.log('Account created successfully:', response);
    return response;
  } catch (error) {
    console.error('Error creating account:', error);
  }
}

// Log in to an existing account
async function login(email: string, password: string) {
  try {
    const account = new Account(client);
    const response = await account.createSession(email, password);
    console.log('Login successful:', response);
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

// Check if the user is logged in
async function isLoggedIn() {
  try {
    const account = new Account(client);
    const response = await account.get();
    if (response) {
    console.log('User is logged in:', response);
    }
    return true
    
  } catch (error) {
    console.error('User is not logged in:', error);
    return false;
  }
}

async function hasPaidLabel() {
  try {
    const account = new Account(client);
    const response = await account.get();
    const labels = response.labels;
    if (labels.includes("paid")) {
      console.log('User has paid label.');
      return true
    } else {
      console.log('User does not have paid label.');
      return false;
    }
  } catch (error) {
    console.error('Error checking for paid label:', error);
  }
}

export {createAccount, login, isLoggedIn, hasPaidLabel}

// Example usage
