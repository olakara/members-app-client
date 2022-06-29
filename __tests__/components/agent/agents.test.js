
import AgentsPresenter  from '../../../components/agent/agents.presenter';
import httpGateway from '../../../shared/http-gateway';
import agentsRepository from '../../../components/agent/agents.repository';
import Observable from '../../../shared/observable';

let getStub = null;
let postStub = null;

beforeEach( async()=> {

    agentsRepository.programmersModel = new Observable([]);

 getStub =[{
            cascadeId: '8ca15b24-f316-11ec-b939-0242ac120002',
            email:'admin@admin.com',
            id: '9e0092d6-f316-11ec-b939-0242ac120002',
            isActive: true,
            mobileNumber: '0502837490',
            fullName: 'Admin',
        }];

 postStub = {
    success: true
  };

  httpGateway.get = jest.fn().mockImplementation(() => {
        return Promise.resolve(getStub);
    });

   httpGateway.post = jest.fn().mockImplementation(()=> {
        return Promise.resolve(postStub);
    });

});

it('should hit backend API and load 1 view model agents when loaded from backend', async () => {

    let viewModel = null;
    let agentsPresenter = new AgentsPresenter();
    
    await agentsPresenter.load((generatedViewModel) => {
        viewModel = generatedViewModel;
    });
    
    expect(httpGateway.get).toHaveBeenCalledWith("http://membership-app.me/users/role");
    expect(viewModel.length).toBe(1);
    expect(viewModel[0].fullName).toBe('Admin');
    expect(viewModel[0].email).toBe('admin@admin.com');

})

it("should add a state user when api is called with POST method", async () => {

    let viewModel = null;
    let agentsPresenter = new AgentsPresenter();

    let result = await agentsPresenter.createAgent({
        fullName: "state-admin",
        email: "state-admin@kmcc.com",
        mobile: "0501234123",
        alternateMobile: "0501234123",
        designation: "state admin",
        role: "state-admin",
        location: "3472B53D-0EF9-4251-B291-190B35CD280B"
    });


    expect(httpGateway.post).toHaveBeenCalledWith("http://membership-app.me/users/",{
        fullName: "state-admin",
        email: "state-admin@kmcc.com",
        mobileNumber: "0501234123",
        alternativeContactNumber: "0501234123",
        designation: "state admin",
        role: "state-admin",
        cascadeId: "3472B53D-0EF9-4251-B291-190B35CD280B"
    });

    expect(result.success).toBe(true)

});