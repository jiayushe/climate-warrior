App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load badges.
    $.getJSON('../badges.json', function(data) {
      var badgesRow = $('#badgesRow');
      var badgeTemplate = $('#badgeTemplate');

      for (i = 0; i < data.length; i ++) {
        badgeTemplate.find('.panel-title').text(data[i].name);
        badgeTemplate.find('img').attr('src', data[i].picture);
        badgeTemplate.find('.badge-price').text(data[i].price);
        badgeTemplate.find('.badge-star').text(data[i].star);
        badgeTemplate.find('.btn-donate').attr('data-id', data[i].id);

        badgesRow.append(badgeTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
	  if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
	// Legacy dapp browsers...
	  else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
	// If no injected web3 instance is detected, fall back to Ganache
	  else {
  	  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	  }
	  web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Donation.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
  	  var DonationArtifact = data;
  	  App.contracts.Donation = TruffleContract(DonationArtifact);
  	  // Set the provider for our contract
  	  App.contracts.Donation.setProvider(App.web3Provider);
  	  // Use our contract to retrieve and mark the donated badges
  	  return App.markDonated();
	});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-donate', App.handleDonate);
  },

  markDonated: function(donors, account) {
    var donationInstance;
	  App.contracts.Donation.deployed().then(function(instance) {
      donationInstance = instance;
  	  return donationInstance.getDonors.call();
	  }).then(function(donors) {
  	  for (i = 0; i < donors.length; i++) {
    	  if (donors[i] !== '0x0000000000000000000000000000000000000000') {
      	  $('.panel-badge').eq(i).find('button').text('Success').attr('disabled', true);
    	  }
  	  }
	  }).catch(function(err) {
  	  console.log(err.message);
	  });
  },

  handleDonate: function(event) {
    event.preventDefault();

    var badgeId = parseInt($(event.target).data('id'));

    var donationInstance;

	  web3.eth.getAccounts(function(error, accounts) {
  	  if (error) {
   	    console.log(error);
  	  }
  	  var account = accounts[0];
	    App.contracts.Donation.deployed().then(function(instance) {
    	  donationInstance = instance;
        // Execute donation as a transaction by sending account
    	  return donationInstance.donateChange(badgeId, {from: account});
  	  }).then(function(result) {
    	  return App.markDonated();
  	  }).catch(function(err) {
        console.log(err.message);
  	  });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
