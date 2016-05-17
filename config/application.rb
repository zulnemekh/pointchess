require File.expand_path('../boot', __FILE__)

require 'rails/all'

# require "rails/test_unit/railtie"

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
end

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Reddit
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.encoding = "utf-8"
    # config.filter_parameters += [:password]
    # config.active_support.escape_html_entities_in_json = true
    # config.active_record.whitelist_attributes = true
    # config.assets.enabled = true
    # config.assets.version = '1.0'
    # config.exceptions_app = self.routes
    # config.action_controller.consider_all_requests_local = false
    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local
  end
end
