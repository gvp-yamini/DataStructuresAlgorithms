///////////////////////////////
// app.js - Global variables
//////////////////////////////

// Default animation timing constants
var ease = kony.anim.EASE; // [.25,.1,.25,1]
var linear = kony.anim.LINEAR; // [0,0,1,1]
var easeIn = kony.anim.EASIN_IN; // [.42,0,1,1]
var easeOut	= kony.anim.EASIN_OUT; // [0,0,.58,1]
var easeInOut		= kony.anim.EASIN_IN_OUT; // [.42,0,.58,1]

var none = kony.anim.FILL_MODE_NONE;
var forwards = kony.anim.FILL_MODE_FORWARDS;
var backwards = kony.anim.FILL_MODE_BACKWARDS;

// Default animation duration
var duration = 0.4;

// user agent 
var userAgent;

// Current Form
var CurrForm;

var savingsColor = "20C6C4";
var checkingColor = "8F61B7";
var creditColor = "F5B919";
var deposit = "4a90e2";
var mortage = "8d6428";

var accountTypeSavings = "20C6C4";
var accountTypeChecking = "8F61B7";
var accountTypeCredit = "F5B919";
var accountTypeCurrent = "4a90e2";
var accountTypeMortage = "8d6428";
//Negative amount skin for account
var accountNegative = "accountAmountNegative";

// Pending skins for name,date,amount in transaction segments
var pendingName = "transactionNameSkinPending";
var pendingDate = "transactionDateSkinPending";
var pendingAmount = "transactionAmountSkinPending";

// Negative amount skin
var transactionNegative = "transactionAmountSkinNegative";

// Disabled primary action button skin
var primaryActionDisabled = "primaryActionDisabled";
var primaryActionEnabled = "primaryAction";



// Transaction variables
//////////////////////////

// initial Account Card heights
var toCardHeight;
var fromCardHeight;

var fromCardHeightPayPerson;

var toCardHeightDeposit;

var toCardHeightPayBill;
var fromCardHeightPayBill;

var amountCardHeight = "135dp";
var frequencyCardHeight;

// card height after selection
var defaultCardHeight = "62dp";
// current frequency selection
var frequencySelection;
// To,from,amount,freq,date active label location
var labelLeft = "8dp";