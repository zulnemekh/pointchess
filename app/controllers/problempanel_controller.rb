class ProblempanelController < ApplicationController
  def new
 		@problem = Base::MtbProblems.new
  end

  def show
    respond_with(@problem)
  end

  def index
  	@problems = Base::MtbProblems.all
    # @objArray = []
    # @problems.each do |problem|
    #   @objArray.push problem
    # end
  end

  def edit
  	@problem = Base::MtbProblems.find(params[:id])
  end

  def update
    @problem = Base::MtbProblems.find(params[:base_mtb_problems][:id])
    @problem.update(params[:base_mtb_problems])
    @problem.save!
    redirect_to :action => 'index'
  end

  def destroy
    @problem.destroy
    respond_with(@problem)
  end

  def create
    todo = Base::MtbProblems.new(params[:base_mtb_problems])
    todo.save!
    redirect_to :action => 'index'
  end


end
