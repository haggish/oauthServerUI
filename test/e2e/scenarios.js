'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /tokens when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/tokens");
  });


  describe('tokens', function() {

    beforeEach(function() {
      browser().navigateTo('#/tokens');
    });


    it('should render tokens when user navigates to /tokens', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 1/);
    });

  });


  describe('resources', function() {

    beforeEach(function() {
      browser().navigateTo('#/resources');
    });


    it('should render resources when user navigates to /resources', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});
