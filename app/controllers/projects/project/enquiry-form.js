import Ember from 'ember';

export default Ember.Controller.extend({


  showCustomerComponent: false,
  showAgentComponent: false,

  stepOne: true,
  stepTwo: false,
  stepThree: false,

  actions: {
    toStepTwo: function() {
      this.set('stepOne', false);
      this.set('stepTwo', true);
    },

    toStepThree: function() {
      this.set('stepTwo', false);
      this.set('stepThree', true);
    },

    toStepOne: function(){
      this.set('stepThree', false);
      this.set('stepOne', true);
    },
    openCustomerComponent: function() {

      this.toggleProperty('showCustomerComponent');
    },
    openAgentComponent: function() {

      this.toggleProperty('showAgentComponent');
    },


    onToggle:function(){
      if(this.model.get('hasDirtyAttributes')){
        this.model.save();
      }
    },
    deleteData:function(){
      var controller = this;
      this.model.deleteRecord();
      this.model.save();
      controller.transitionToRoute('customers.new');
    },
    onSelectCustomer(customer) {
      this.set('project.customer', customer);

    },

    onSelectAgent(agent) {
      this.set('project.agent', agent);
    },

    onSelectItemtypes(index , itemType){
      this.set('project.items').objectAt(index).set('itemtype', itemType);
    },

    onSelectJobtypes(index , jobType  ){
      this.get('project.items').objectAt(index).set('jobtype',jobType);
    },


    createCustomer: function() {
      var controller = this;
      var customer = this.store.createRecord('customer', {
        name :this.get('custname'),
        contactname :this.get('custcontactname'),
        contactno :this.get('custcontactno'),
        othcontactno :this.get('custothcontactno'),
        othrefdetails:this.get('custothrefdetails'),
      });
      customer.save().then(function(){

        controller.set('custname','');
        controller.set('custcontactname','');
        controller.set('custcontactno','');
        controller.set('custothcontactno','');
        controller.set('custothrefdetails','');


        controller.send('onSelectCustomer',customer);
        controller.set('showCustomerComponent' ,false);

        controller.notifications.addNotification({
          message: 'Customer Created successfully!' ,
          type: 'success',
          autoClear: true
        });
      });
    },


    createAgent: function() {
      var controller = this;
      var agent = this.store.createRecord('agent', {
        name :this.get('agentname'),
        contactname :this.get('agentcontactname'),
        contactno :this.get('agentcontactno'),
        othcontactno :this.get('agentothcontactno'),
        othrefdetails:this.get('agentothrefdetails'),
      });
      agent.save().then(function(){

        controller.set('agentname','');
        controller.set('agentcontactname','');
        controller.set('agentcontactno','');
        controller.set('agentothcontactno','');
        controller.set('agentothrefdetails','');


        controller.send('onSelectAgent',agent);
        controller.set('showAgentComponent' ,false);

        controller.notifications.addNotification({
          message: 'agent Created successfully!' ,
          type: 'success',
          autoClear: true
        });
      });
    },
  },

});
