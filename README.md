# 🎟 Event Ticketing Platform

## 📝 Description

This project is a web-based event ticketing platform that allows users to create and attend events seamlessly. Utilizing blockchain technology, it incorporates smart contracts written in Solidity for secure and transparent transactions. Using GHO tokens for purchases, the platform offers a reliable solution for event management and ticket sales. The Sepolia Ethereum testnet is chosen for its reliability, enabling safe testing of smart contracts before deployment on the Ethereum mainnet.

## 🌟 Features

- **🎉 Event Creation**: Users can create events, specifying details such as title, date, time, and ticket price.
- **🎫 Ticket Purchasing**: Attendees can purchase tickets using GHO tokens.
- **🔗 Wallet Integration**: Incorporates Connect Kit for secure cryptocurrency wallet connections.
- **💻 Responsive Design**: Ensures a smooth user experience across various devices.
- **📜 Smart Contract Integration**: Leverages Solidity-based smart contracts for managing events and ticket sales.

## 🛠️ Pages

### Home Page

- **Overview**: The Home page serves as the landing page of the platform, where users can discover and browse through various events listed.
- **Features**:
  - **Event List**: Displays all the available events with essential details like name, date, and location.
  - **Search and Filter**: Users can search for events or apply filters based on categories such as event type, location, and date.
  - **Navigation**: Easy access to other sections of the platform like My Events and Create Event.

### My Events Page

- **Overview**: This page shows the events associated with the user.
- **Features**:
  - **Purchased Tickets**: Lists all events where the user has tickets, including details like date, time, and price.

### Create Event Page

- **Overview**: Users can set up new events to be listed on the platform on this page.
- **Features**:
  - **Event Form**: A form to enter all new event details, including title, date, time, ticket price, etc.
  - **Smart Contract Integration**: Deploys a smart contract for each new event to handle ticketing using NFT.
  - **Preview and Publish**: Users can preview their event listing before publishing it to the Home page.

## 🔒 Security Features

### Wallet Connection Requirement

In our platform, the wallet connection status plays a crucial role in user accessibility and security:

- **Event Browsing**: All users, regardless of their wallet connection status, can browse and view event details on the Events Page.

- **Restricted Access**: Certain actions, such as purchasing tickets, are restricted to users whose wallets are connected. This ensures a secure transaction environment and validates user identity.

- **Automatic Redirection**: If a user's wallet gets disconnected, the application automatically restricts access to features that require a wallet connection. For instance, users will be redirected to the Events Page and will not be able to make purchases until their wallet is reconnected.

This security approach ensures that our platform remains user-friendly while upholding high standards of transaction security and user verification.


## 💻 Technologies Used

- React.js
- Next.js
- Tailwind CSS (for styling)
- wagmi (for Ethereum blockchain interaction)
- ethers.js (Ethereum wallet implementation)
- Solidity (for smart contract development)
- Connect Kit (for wallet connections)
- Sepolia Ethereum testnet

## 🚀 Future Scope

### Upcoming Features and Enhancements:

- **Decentralized Identity Integration**: Implement decentralized identity verification to enhance security and trust within the platform.

- **Advanced Analytics Dashboard**: Develop an analytics dashboard for event organizers to track sales, audience demographics, and engagement metrics in real-time.

- **NFT Ticketing**: Integrate Non-Fungible Tokens (NFTs) for unique, collectible, and resellable event tickets, providing an additional layer of uniqueness and value for ticket holders.

- **Integration with Additional Blockchains**: Expand our platform’s compatibility with other blockchain networks to offer more flexibility in terms of ticketing and payments.

- **Sustainability Features**: Implement features to promote and support sustainable and eco-friendly events.

- **Community Features**: Develop a community forum and feedback system for users to engage with each other and provide direct input into the platform's development.

- **Smart Contract Upgrades**: Continuously improve the smart contract architecture for enhanced performance, security, and scalability.

### Continuous Improvement:

- **User Experience Enhancements**: Regular updates to the UI/UX to make the platform more intuitive and user-friendly.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git
- A wallet with testnet GHO tokens

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Dharmik79/eth_global.git
2. Install NPM packages
   ```sh
    npm install --force
3. Start the development server
   ```sh
   npm run dev


## 👥 Contributors

Thank you to all our contributors:

- **[Bhargavkumar Kakadiya](https://www.linkedin.com/in/bhargavkakadiya/)**
- **[Dharmik Dholariya](https://www.linkedin.com/in/dharmikdholariya/)**
