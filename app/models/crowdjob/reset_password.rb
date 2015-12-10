# coding: utf-8
class Crowdjob::ResetPassword < Base::DtbUserInfo
  
# ======================= Validation ================================================
  validates_presence_of :user_id, :message => I18n.t("messages.E101000")
  
  validates :user_id, :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message => "メールアドレスの形式が正しくありません"}
  
  validates_presence_of :password, :message => I18n.t("messages.E101001")
  
  validates_confirmation_of :password, :message => I18n.t("messages.I101033")
  
  validates :password, confirmation: true
# ===================================================================================

end
