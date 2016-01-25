import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model: function(params) {
    return this.store.findRecord('project', params.id);
  },


  setupController: function(controller) {
    if(Ember.isEqual('admin', this.get('session.data.authenticated.role'))){
      controller.set('isAdmin',true );
    }
    if(Ember.isEqual('designer', this.get('session.data.authenticated.role'))){
      controller.set('isDesigner',true );
    }
    if(Ember.isEqual('siteworker', this.get('session.data.authenticated.role'))){
      controller.set('isSiteworker',true );
    }
    if(Ember.isEqual('secretary', this.get('session.data.authenticated.role'))){
      controller.set('isSecretary',true );
    }
  }
});
