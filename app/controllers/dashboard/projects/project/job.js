import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import ENV from '../../../../config/environment';

export default Ember.Controller.extend({

  actions: {

    saveJobdetails :function(){
      var controller  = this;
      let items = this.get('project').get('items');
      items.forEach(function(item){
        item.save().catch(function(){
          controller.notifications.addNotification({
            message: 'Sorry, cant save at the moment !' ,
            type: 'error',
            autoClear: true
          });
        });
      }).then(function(){
        controller.notifications.addNotification({
          message: 'Job Details Saved!' ,
          type: 'success',
          autoClear: true
        });
      });
    },
    uploadSiteimage :function(params){
      var controller = this;
      let files = params.files,
      item = params.item;

      console.log(files);
      var newSiteImage = this.store.createRecord('siteimage',{description: '',item :item});
      controller.send('loading');
      //TODO: catch all errors
      newSiteImage.save().then(function(newSiteImage){
        console.log('New site image created');
        var uploader = EmberUploader.Uploader.create({
          url: ENV.APP.host + '/siteimages/'+newSiteImage.id,
          type: 'PATCH',
          paramNamespace: 'siteimage',
          paramName: 'url',
          // ajaxSettings: function() {
          //   var settings = this._super.apply(this, arguments);
          //   settings.headers = {
          //     'Token': 'token'
          //   };
          //   return settings;
          // }

        });

        // EmberUploader.Uploader.extend({
        //   ajaxSettings: function() {
        //     var settings = this._super.apply(this, arguments);
        //     settings.headers = {
        //       'Token': 'mytoken'
        //     }
        //     return settings;
        //   }
        // });
        //
        // var MyUploader = Uploader.extend({
        //   ajaxSettings: function() {
        //     var settings = this._super.apply(this, arguments);
        //     settings.headers = {
        //       'Token': 'mytoken'
        //     }
        //     return settings;
        //   }
        // });


        if (!Ember.isEmpty(files)) {
          console.log('New site image going to upload');
          uploader.upload(files[0]).then(function(){
            console.log('New site image uploaded');
            newSiteImage.reload();
          }
        );
      }
      controller.send('finished');
    }).catch(function(){
      controller.notifications.addNotification({
        message: 'Sorry, cant save at the moment !' ,
        type: 'error',
        autoClear: true
      });
    });
  },
  deleteSiteimage :function(siteimage){
    var controller = this;
    siteimage.destroyRecord().then(function () {
    }).catch(function () {
      siteimage.rollbackAttributes();
      controller.notifications.addNotification({
        message: 'Image cannot be deleted at this moment' ,
        type: 'error',
        autoClear: true
      });
    });
  }


},


});