import MembersPresenter from "../../../components/member/members.presenter";
import httpGateway from "../../../shared/http-gateway";
import membersRepostory from "../../../components/member/members.repository";
import Observable from "../../../shared/observable";

let getStub = null;
let postStub = null;

beforeEach( async() => {

    membersRepostory.programmersModel = new Observable([]);

    getStub = [];

    postStub = {
        success: true
    };

    httpGateway.get = jest.fn().mockImplementation(() => {
        return Promise.resolve(getStub);
    });

    httpGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(postStub);
    });
})


it('should hit backend API and load 2 view models ie, members', async () => {

    let viewModel = null;

    let membersPresenter = new MembersPresenter();

    await membersPresenter.load((generatedViewModel) => {
        viewModel = generatedViewModel;
    })

    expect(httpGateway.get).toHaveBeenCalledWith("http://membership-app.me/members/role");
    expect(viewModel.length).toBe(2);
    expect(viewModel[0].fullName).toBe('Admin');
    expect(viewModel[0].email).toBe('admin@admin.com');

});