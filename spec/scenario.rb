# coding: utf-8
require 'rails_helper'
require 'spec_helper'
require 'selenium/webdriver'

admin_site_domain = "http://testteam.admin.crowd-job.com"
partner_site_domain = "http://testteam.partner-admin.crowd-job.com"
ps_crowdjob_domain = "http://testteam.ps3.crowd-job.com"
ps_abcdtask_domain = "http://testteam.ps3.abcdtask.com"

Capybara.current_driver = :selenium
Capybara.app_host = admin_site_domain

describe 'blog post page' do
   page.driver.browser.manage.window.maximize
   visit "/clients"
end