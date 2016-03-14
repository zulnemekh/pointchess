class ProblemsController < ApplicationController
  before_action :set_problem, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @problems = Problem.all
    respond_with(@problems)
  end

  def show
    respond_with(@problem)
  end

  def new
    @problem = Problem.new
    respond_with(@problem)
  end

  def edit
  end
  
  #pgn viewer-g ashiglan problem solver-g hih huudas
  def fenpuzzle
  
  end
  #pgn viewer-g pgn-g analyse hiih huudas
  def pgnanalyse
  
  end
  #problem solver-g hiisen huudas
  def problems
  
  end

  def mqtt
  
  end

  def create
    @problem = Problem.new(problem_params)
    @problem.save
    respond_with(@problem)
  end

  def update
    @problem.update(problem_params)
    respond_with(@problem)
  end

  def destroy
    @problem.destroy
    respond_with(@problem)
  end

  private
    def set_problem
      @problem = Problem.find(params[:id])
    end

    def problem_params
      params.require(:problem).permit(:title, :pgn_data, :fen, :insert_admin, :move)
    end
end
