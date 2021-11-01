/**
 * @file
 * JavaScript behaviors for Commerce add to cart ajax.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Remove views/ajax url for commerce addtocart ajax submissions.
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for commerce addtocart ajax.
   */
  Drupal.behaviors.commerceAddToCartAjax = {
    attach: function (context) {
      // Add submit handler to form.beforeSend.
      // Update Drupal.Ajax.prototype.beforeSend only once.
      if (typeof Drupal.Ajax !== 'undefined' && typeof Drupal.Ajax.prototype.beforeSubmitCommerceAddToCartAjax === 'undefined') {
        Drupal.Ajax.prototype.beforeSubmitCommerceAddToCartAjax = Drupal.Ajax.prototype.beforeSubmit;
        Drupal.Ajax.prototype.beforeSubmit = function (form_values, element_settings, options) {
          if (this.callback === "commerce_addtocart_ajax_ajax_validate" && options.url.indexOf("/views/ajax") === 0) {
            // Remove /views/ajax from url.
            options.url = options.url.replace("/views/ajax", "");
          }
          return this.beforeSubmitCommerceAddToCartAjax.apply(this, arguments);
        };
      }
    }
  }

})(jQuery, Drupal);
