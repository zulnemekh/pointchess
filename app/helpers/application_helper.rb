module ApplicationHelper

	 # user_logged?
    def self.user_logged?(session)
        return session[:id].present? ? true : false
    end

    def self.current_user(session)
        user = Base::DtbUserInfo.find_by_id(session[:id])
        return user
    end

  
    # ================= Encryption and Decryption =======================================
    require 'openssl'
    require 'base64'
    @cert_path = "#{Rails.root}/config/"

    # RSA ENCRYPTION
    def self.encrypt(param_value)

        public_key = OpenSSL::PKey::RSA.new(File.read((@cert_path + 'public2.pem')))
        encrypted_string = Base64.encode64(public_key.public_encrypt(param_value))

        return encrypted_string
    end

    # RSA DECRYPTION
    def self.decrypt(param_value_encrypted)

        private_key = OpenSSL::PKey::RSA.new(File.read((@cert_path + 'private2.pem')), '12345')
        decrypted_string = (private_key.private_decrypt(Base64.decode64(param_value_encrypted)))
        decrypted_string = decrypted_string.force_encoding(Encoding::UTF_8)

        return decrypted_string
    end


    require 'digest/md5'

    def self.encrypt_md5(param_value)
        encrypted_string = Digest::MD5.hexdigest(param_value)
        return encrypted_string
    end

    require 'digest/sha1'

    def self.encrypt_sha(string)
        encrypted_string = Digest::SHA1.hexdigest(string)
        return encrypted_string
    end

    # ================= End Encryption and Decryption =======================================



end
