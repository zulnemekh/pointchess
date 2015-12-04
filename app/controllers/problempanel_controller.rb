class ProblempanelController < ApplicationController
  def new
 		@problem = Base::MtbProblems.new
     render template: 'edit'
  end

  def show
    respond_with(@problem)
  end

  def index
  	@problems = Base::MtbProblems.all
  end

  def edit
  	@problem = Base::MtbProblems.find(params[:id])
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
      @problem = Base::MtbProblems.find(params[:id])
    end

    def problem_params
      params.require(:problem).permit(:title, :pgn_data, :fen, :insert_admin, :move)
    end
end
