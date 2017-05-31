"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_cloudinary_1 = require('ng2-cloudinary');
var homeservice_1 = require('../../../providers/homeservice');
var PropertyimageoComponent = (function () {
    function PropertyimageoComponent(mainService) {
        this.mainService = mainService;
        this.images = [];
        this.uploader = new ng2_cloudinary_1.CloudinaryUploader(new ng2_cloudinary_1.CloudinaryOptions({
            cloudName: 'privadia',
            uploadPreset: 'blmelyur'
        }));
    }
    PropertyimageoComponent.prototype.ngOnInit = function () {
        var _this = this;
        $.getScript('../../../../assets/js/plugins/jssor.slider-23.1.6.mini.js');
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            $.notify({
                icon: "notifications",
                message: "Successfully uploaded"
            }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            var img = JSON.parse(response);
            _this.images.push({
                FileName: img.url,
                ImageId: img.public_id
            });
            $.getScript('../../../../assets/js/init/initImageGallery.js');
            console.log(img);
            return { item: item, response: response, status: status, headers: headers };
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            $.notify({
                icon: "notifications",
                message: "Image Upload Failed"
            }, {
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
            return { item: item, response: response, status: status, headers: headers };
        };
    };
    PropertyimageoComponent.prototype.uploadImage = function () {
    };
    PropertyimageoComponent.prototype.fileChange = function () {
        this.uploader.uploadAll();
    };
    PropertyimageoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' propertyimage-cmp ',
            templateUrl: 'propertyimage.component.html',
            styleUrls: ['propertyimage.component.css']
        }), 
        __metadata('design:paramtypes', [homeservice_1.MainService])
    ], PropertyimageoComponent);
    return PropertyimageoComponent;
}());
exports.PropertyimageoComponent = PropertyimageoComponent;
//# sourceMappingURL=propertyimage.component.js.map