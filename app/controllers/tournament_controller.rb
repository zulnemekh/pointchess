class TournamentController < ApplicationController
  before_filter :check_login
  
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

  def create
    raise params.to_s
    game = Base::DtbTournament.new(params[:base_mtb_tactics])
    game.save
    redirect_to :action => 'list'
  end
  def get_tournament_users
    channel_id = params[:tournament_id]
    render json: Base::DtbTournamentUsers.where(tournament_id: channel_id)
  end
  def log
    channel_id = params[:tournament_id]
    action = params[:control_action]
    data = Hash.new
    data["result"] = "fail"
    case action
    when "join"
      puts "JOIN"
      listener = Base::DtbTournamentUsers.where(user_id: session[:id]).where(tournament_id: channel_id).first
      if listener.blank?
        listener = Base::DtbTournamentUsers.new
        listener.user_id = session[:id]
        listener.user_name = ApplicationHelper.current_user(session).name
        listener.joined_at = Time.zone.now
        listener.tournament_id = channel_id
      end
      listener.status=1
      if listener.save!
        data["result"] = "success"
      end
    when "leave"
      puts "LEAVE"
      listener = Base::DtbTournamentUsers.where(user_id: session[:id]).first
      unless listener.blank?
        listener.status = 2
        if listener.save!
          data["result"] = "success"
        end
      end
    else
      puts "this is other haha. you looser!"
    end
    render :json => data
  end

  def new
    @game = Base::DtbTournament.new
  end

  def destroy
  end

  def get_user
  	render json: Base::DtbUserInfo.find_by_id(session[:id])
  end

  def get_tactic
  	render json: Base::MtbTactics.where("tactic_type = 2 and genre = 1")
      .order("RAND()").limit(10)
  end
end
