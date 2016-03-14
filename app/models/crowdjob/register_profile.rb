# coding: utf-8
class Crowdjob::RegisterProfile < Base::DtbUserInfo

  def M_or_F?
    gender.nil? or gender == "M"
  end  
  
  #sanitizes
  before_save :html_escape_fields
  
  private
  def html_escape_fields
    self.corporation = ApplicationHelper.html_escape(self.corporation)
    self.url_corporation = ApplicationHelper.html_escape(self.url_corporation)
    self.managerial_position = ApplicationHelper.html_escape(self.managerial_position)
    self.surname_kanji = ApplicationHelper.html_escape(self.surname_kanji)
    self.firstname_kanji = ApplicationHelper.html_escape(self.firstname_kanji)
    self.surname_kana = ApplicationHelper.html_escape(self.surname_kana)
    self.firstname_kana = ApplicationHelper.html_escape(self.firstname_kana)
    #self.birthday = ApplicationHelper.html_escape(self.birthday)
    self.telnumber = ApplicationHelper.html_escape(self.telnumber)
    self.postcode = ApplicationHelper.html_escape(self.postcode)
    self.address_general = ApplicationHelper.html_escape(self.address_general)
    self.address_detail = ApplicationHelper.html_escape(self.address_detail)
  end  
  
  # # =============== Presence check ==============================
# # E103014: "氏を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :surname_kanji, :message => I18n.t("messages.E103014"), :if => :check_surname_kanji
# # E103015: "名を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :firstname_kanji, :message => I18n.t("messages.E103015"), :if => :check_firstname_kanji
# # E103016: "カタカナ（氏）を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :surname_kana, :message => I18n.t("messages.E103016"), :if => :check_surname_kana
# # E103018: "カタカナ（名）を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :firstname_kana, :message => I18n.t("messages.E103018"), :if => :check_firstname_kana
# # surname_kana katakana validation 
 # validates :surname_kana, :format => { :with => /^[ァ-ヾ。]+$/u, :message => I18n.t('messages.E103017') }
# # firstname_kana katakana validation 
 # validates :firstname_kana, :format => { :with => /^[ァ-ヾ。]+$/u, :message => I18n.t('messages.E103019') }
#   
#   
# # E103023: "住所1を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :address_general, :message => I18n.t("messages.E103023"), :if => :check_address_general
# # E103024: "住所2を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :address_detail, :message => I18n.t("messages.E103024"), :if => :check_address_detail
# # E103025: "電話番号を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :telnumber, :message => I18n.t("messages.E103025"), :if => :check_telnumber
# # E103027: "会社URLを入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :url_corporation, :message => I18n.t("messages.E103027"), :if => :check_url_corporation
# # E103029: "郵便番号が入力されていること。 "# ユーザー画面 会員登録
  # validates_presence_of :postcode, :message => I18n.t("messages.E103029"), :if => :check_postcode
# # E103009: "郵便番号にハイフンが入力されています。 "# ユーザー画面 会員登録     # postcode must not contain '-' char validation TODO.. check this validation later
  # validates :postcode, :format => { :with => /^$|^[^-]*$/, :message => I18n.t('messages.E103009') }  
  # # postcode must be only hankaku number validation
  # validates :postcode, :format => { :with => /^([\d]+)$/, :message => I18n.t('messages.E103010') }   
  # # postcode must be 7 length
  # validates :postcode, :format => { :with => /^(\d{7})$/i, :message => I18n.t('messages.E103011') }
# # E103021: "生年月日を選択してください。 "# ユーザー画面 会員登録 
   # validates_presence_of :birthday, :message => I18n.t("messages.E103021"), :if => :check_birthday
# # Checking for valid birthday
  # validates :birthday, :format => { :with => /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/, :message => I18n.t('messages.E103033') }
# # E103022: "都道府県を選択してください。 "# ユーザー画面 会員登録  TODO.. check this validation later
  # validates_presence_of :prefectures, :message => I18n.t("messages.E103022")  
#  
# # ========================== KOJIN Validation ==============================================
# # E103013: "役職名を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :managerial_position, :message => I18n.t("messages.E103013")
# # E103012: "会社名を入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :corporation, :message => I18n.t("messages.E103012"), :if => :check_corporation
# # E103027: "会社URLを入力してください。 "# ユーザー画面 会員登録 
  # validates_presence_of :url_corporation, :message => I18n.t("messages.E103027"), :if => :check_url_corporation
# # ==========================================================================================
#    
# # =============== Presence of selection check ==========================
# # E103020: "性別を選択してください。 "# ユーザー画面 会員登録 
  # #validates_inclusion_of  :gender, :in => ["F", "M"], :message => I18n.t("messages.E103021")
  

# # Validates whether user term is checked or not. :telnumber is used only for user agreement, not for saving.
  # # validates_numericality_of :telnumber, :only_integer => true, :message => I18n.t("messages.E103026")
#   
  # has_one :prefecture, :class_name => "MtbPrefectures", :foreign_key => "id", :primary_key => "prefectures"
  # $obj = Base::MtbProfileSet.where(profile_id: 1).first
#   
# 
# def check_corporation
  # if $obj.set_corporation == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_managerial_position
  # if $obj.set_managerial_position == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_surname_kanji
  # if $obj.set_surname_kanji == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_firstname_kanji
  # if $obj.set_firstname_kanji == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_surname_kana
  # if $obj.set_surname_kana == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_firstname_kana
  # if $obj.set_firstname_kana == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_address_general
  # if $obj.set_address_general == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_address_detail
  # if $obj.set_address_detail == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_telnumber
  # if $obj.set_telnumber == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_url_corporation
  # if $obj.set_url_corporation == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_postcode
  # if $obj.set_postcode == 1
    # return true
  # else 
    # return false
  # end 
# end
# #------------------------------------------------------------------
# def check_gender
  # if $obj.set_gender == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_birthday
  # if $obj.set_birthday == 1
    # return true
  # else 
    # return false
  # end 
# end
# 
# def check_prefectures
  # if $obj.set_prefectures == 1
    # return true
  # else 
    # return false
  # end 
# end
end
