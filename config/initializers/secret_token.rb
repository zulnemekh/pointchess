# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Reddit::Application.config.secret_key_base = 'f95e00bcf994be6bc906afdd615a8f1429e787713b9e6356ea4f8a07774b241df6f9035f3ad6a1156995b4f61da638a2f798313fed21be3562d715e8eba6f516'
