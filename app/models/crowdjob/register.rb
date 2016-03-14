class Crowdjob::Register < Base::DtbUserInfo
  attr_accessible :password_confirmation
  
  #sanitizes
  before_save :html_escape_fields
  
  private
  def html_escape_fields
    self.nickname = ApplicationHelper.html_escape(self.nickname)
    self.user_id = ApplicationHelper.html_escape(self.user_id)
  end  
end