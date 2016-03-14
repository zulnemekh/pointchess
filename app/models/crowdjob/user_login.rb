# coding: utf-8
class Crowdjob::UserLogin < Base::DtbUserInfo
  
# ======================= Validation ================================================
  # Validates whether mail address is entered or not
  validates_presence_of :user_id, :message => I18n.t("messages.E101000")
  # Validates whether password is entered or not
  validates_presence_of :password, :message => I18n.t("messages.E101001")
# ===================================================================================

# ======================= Authenticaiont ============================================
  # login can be either username or email address
  def self.authenticate(user_id, pass)
   user = Base::DtbUserInfo.find_by_user_id(user_id)
   #if ApplicationHelper.decrypt(user.password) == pass
   if user && ApplicationHelper.decrypt(user.password).to_s == pass.to_s
       user
   else
      nil
   end
  end
# ===================================================================================
end
