const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const APP = express();
const PORT = 3001;

APP.use(bodyParser.json());
APP.use(cors());

var DATABASE;

const connectToDatabase = () => {
  const CONNECTION_STRING = "mongodb://localhost:27017/quantum";
  mongoose.connect(CONNECTION_STRING);

  mongoose.Promise = global.Promise;
  const database = mongoose.connection;
  database.on("connected", () => {
    console.log("Connected")
  })
};

const checkDbConnection = () => {
  DATABASE.on("connected", () => {
    console.log("Successfully connected to database");
  });
  DATABASE.on("error", () => {
    console.log("Error connecting to database");
  });
};

APP.listen(PORT, () => {
  console.log("Quantum server is now live");
  // const CONNECTION_STRING = "mongodb://localhost:27017/quantum";
  // mongoose.connect(CONNECTION_STRING);
  // mongoose.Promise = global.Promise;
  // var database = mongoose.connection;
  // database.on("connected", () => {
  //   console.log("Connected")
  // })
  // database.on("error", () => {
  //   console.log("error")
  //   console.log("")
  // })
    
});

// FUNCTIONS

const transferOwnership = (NFT, owner) => {
  NFT["owner"] = owner;
  //Ownership update in NFT
  return NFT;
};

const getRepaymentDetails = (amount, rate, months) => {
  console.log(amount, rate, months);
  amount = amount * 129172.68;
  const interest = (amount * (rate * 0.01)) / months;
  const total = (amount / months + interest).toFixed(2);
  return {
    loanAmount: amount,
    interest: interest * months,
    montlyPayable: total,
    totalPayable: total * months,
  };
};

APP.post("/quantum/request-loan", (req, res, next) => {
  const { user, NFT } = req.body;
  //To add in database
  const responseData = `Hello ${user.name}, Your loan request has been submitted. We'll notify you once the loan request is approved`;
  res.send(responseData);
});

APP.post("/quantum/approve-loan", (req, res, next) => {
  console.log("came")
  const { user, loanDetails } = req.body;
  let { NFT } = req.body;
  const ownerBeforeLoanApproval = NFT.owner;
  NFT = transferOwnership(NFT, "quantum");
  const ownerAfterLoanApproval = NFT.owner;
  // Update the NFT detail
  //Store the loan details
  res.send({
    status: "Approved",
    NFT: {
      originalOwner: ownerBeforeLoanApproval,
      currentOwner: ownerAfterLoanApproval,
    },
    loanRepaymentDetails: getRepaymentDetails(
      loanDetails.totalAmount,
      loanDetails.ratePerYear,
      loanDetails.months
    ),
  });
});

APP.post("/quantum/reject-loan", (req, res, next) => {
  const { NFT, reason } = req.body;
  // Update the Loan Details
  res.send({
    status: "Rejected",
    reason: reason,
  });
});

APP.get("/quantum/repayment-details", (req, res, next) => {
  const { loanDetails } = req.body;
  res.send(
    getRepaymentDetails(
      loanDetails.totalAmount,
      loanDetails.ratePerYear,
      loanDetails.months
    )
  );
});


APP.get("/quantum/auto-repay-loan", (req, res, next) => {
    const {balance} = req.body
    const loanDetails = {
        loan_id: "loan_1",
        requestor: "user_1",
        walletAddress: '',
        assets: [
          {
            tokenId: "3",
          },
        ],
        borrowedDate: "2023-10-17",
        repayDuration: 12,
        status: "approved",
        loanAmount: 20000,
        interest: 33.333333333333336,
        montlyPayable: "1700.00",
        totalPayable: 20400,
        remainingMonths: 6,
        loanStatus: 'active'
      }
      //transfer
      if(balance >= loanDetails.montlyPayable){
            //update credentials
            res.send(`Loan auto repay successfull. An amount ${loanDetails.montlyPayable} has been transferred to the quantum and the remaining balance is ${balance - loanDetails.montlyPayable}`)
      } else {
        res.send("You dont have enought balance to repay the loan. Please add balance in few days or your loan will be freezed and your NFT will not be refunded")
      }
})

