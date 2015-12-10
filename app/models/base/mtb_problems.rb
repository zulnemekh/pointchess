# coding: utf-8
class Base::MtbProblems < ActiveRecord::Base
 self.table_name = "mtb_problems"
 attr_accessible :id, :fen, :fes, :info, :short_info, :genre
                  
end