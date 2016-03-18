class TournamentController < ApplicationController
  def index
  end

  def battle
  	  @tournament_all=Base::DtbTournament.all
  	  @tactic_all=Base::MtbTactics.where("tactic_type = 2 and genre = 1")
      .order("RAND()").limit(10)
  	  # raise ApplicationHelper.current_user(session).name
  end

  def list
 		@tournament_all=Base::DtbTournament.all
  end
  def get_user
  	render json: Base::DtbUserInfo.find_by_id(session[:id])
  end

  def get_tactic
  	render json: Base::MtbTactics.where("tactic_type = 2 and genre = 1")
      .order("RAND()").limit(10)
  end
end
