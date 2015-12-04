class TournamentController < ApplicationController
  def index
  end

  def battle
  	  @problems_all=Base::MtbProblems.all
  	  # @problem=Base::MtbProblems.select("fen").where('id=?',1).first
  end
end
