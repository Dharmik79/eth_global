# 🎟 Event Ticketing Platform

## 📝 Description

This project is a web3-based event ticketing platform that allows users to create events and buy tickets seamlessly. Utilizing blockchain technology, it incorporates smart contracts written in Solidity for secure and transparent transactions. Using GHO tokens for purchases, the platform offers a reliable solution for event management and ticket sales. The Sepolia Ethereum testnet is chosen for its reliability, enabling safe testing of smart contracts before deployment on the Ethereum mainnet.

## 🌟 Features

- **🎉 Event Creation**: Users can create events, specifying details such as title, date, time, and ticket price. Each event has its own NFTs with max minting tokens.
- **🎫 Ticket Purchasing**: Attendees can purchase tickets using GHO tokens.
- **🔗 Wallet Integration**: Incorporates Connect Kit for secure cryptocurrency wallet connections.
- **💻 Responsive Design**: Ensures a smooth user experience across various devices.
- **📜 Smart Contract Integration**: Leverages Solidity-based smart contracts for managing events and ticket sales.

## 🛠️ Pages

### Home Page

- **Overview**: The Home page serves as the landing page of the platform, where users can discover and browse through various events listed.
- **Features**:
  - **Event List**: Displays all the available events with essential details like name, date, and location.

### My Events Page

- **Overview**: This page shows the events associated with the user.
- **Features**:
  - **Purchased Tickets**: Lists all events where the user has tickets, including details like date, time, and price.

### Create Event Page

- **Overview**: Users can set up new events to be listed on the platform on this page.
- **Features**:
  - **Event Form**: A form to enter all new event details, including title, date, time, ticket price, etc.
  - **Smart Contract Integration**: Deploys a smart contract for each new event to handle ticketing using NFT.

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
- ERC721 (NFTs as Event Tickets)
- Connect Kit (for wallet connections)
- Sepolia Ethereum testnet

## 🚀 Future Scope

### Upcoming Features and Enhancements:

- **Embedding Defi**: Enhance the platform's financial infrastructure by integrating decentralized finance (DeFi) capabilities. This will involve incorporating smart contracts to automate financial processes, enabling features such as decentralized ticket escrows, transparent revenue distribution, and programmable incentives for event participants, loan to event managers and organizers.

- **Decentralized Identity Integration**: Implement decentralized identity verification to enhance security and trust within the platform.

- **Advanced Analytics Dashboard**: Develop an analytics dashboard for event organizers to track sales, audience demographics, and engagement metrics in real-time.

- **Integration with Additional Blockchains**: Expand our platform’s compatibility with other blockchain networks to offer more flexibility in terms of ticketing and payments.

- **Sustainability Features**: Implement features to promote and support sustainable and eco-friendly events.

- **Community Features**: Develop a community forum and feedback system for users to engage with each other and provide direct input into the platform's development.

### Continuous Improvement:

- **User Experience Enhancements**: Regular updates to the UI/UX to make the platform more intuitive and user-friendly.

## 🚀 Getting Started

### Frontend

#### Prerequisites

- Node.js
- npm
- Git
- A wallet with testnet GHO tokens on Sepolia

#### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Dharmik79/eth_global.git
   ```
2. Install NPM packages
   ```sh
    npm install --force
   ```
3. Start the development server
   ```sh
   npm run dev
   ```

### Smart Contracts

For smart contracts, please refer to the [contract repository](https://github.com/bhargavkakadiya/eth-global-lfgho-contracts/).

## 👥 Contributors

Thank you to all our contributors:

- **[BK](https://www.linkedin.com/in/bhargavkakadiya/)**
- **[Dharmik Dholariya](https://www.linkedin.com/in/dharmikdholariya/)**
