# coding: utf-8
class Base::DtbUserInfo < ActiveRecord::Base
  self.table_name = "dtb_user_info"

  attr_accessible :id, :email, :name, :password, :user_type, :gender, :birthday, :postcode, :country, :address_general,
   :address_detail, :telnumber, :url_corporation,  :confirmed, :create_time, :modify_time, :client_ip_address, :last_access, :login_count

  
# ======================= Validation ================================================
  # Validates whether mail address is entered or not
  validates_presence_of :email, :message => "not match"
  # Validates whether password is entered or not
  validates_presence_of :password, :message => "inCorrect password"
# ===================================================================================

# ======================= Authenticaiont ============================================
  # login can be either username or email address
  def self.authenticate(email, pass)
   user = Base::DtbUserInfo.find_by_email(email)
   #if ApplicationHelper.decrypt(user.password) == pass
   if user && ApplicationHelper.decrypt(user.password).to_s == pass.to_s
       user
   else
      nil
   end
  end

end