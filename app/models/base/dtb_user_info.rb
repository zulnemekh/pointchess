# coding: utf-8
class Base::DtbUserInfo < ActiveRecord::Base
  self.table_name = "dtb_user_info"

  attr_accessible :id, :email, :user_point_site_id, :point_site_user_id, :user_property, :name, :password, :user_type, :corporation, :managerial_position,
   :surname_kanji, :firstname_kanji, :surname_kana, :firstname_kana, :gender, :birthday, :postcode, :country, :prefectures, :address_general,
   :address_detail, :telnumber, :url_corporation, :confirmation_file, :confirmed, :confirmation_time, :later_payment, :expose_set,
   :user_status_flag, :change_mail_mail_address, :user_agent, :create_time, :modify_time, :confirmation_file_type, :provider_id, :client_ip_address, :last_access, :login_count, :data_input_task_verified 

  before_save { self.email = email.downcase }
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  # has_secure_password
  validates :password, presence: true, length: { minimum: 6 }

  # Returns the hash digest of the given string.
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
end