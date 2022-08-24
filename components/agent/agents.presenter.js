import agentsRepository from './agents.repository';

export default class AgentsPresenter {
  load = async (callback) => {
    await agentsRepository.getAgents((agentsPm) => {
      const agentsVm = agentsPm.map((agentPm) => {
        return {
          cascadeId: agentPm.cascadeId,
          cascadeName: agentPm.cascadeName,
          email: agentPm.email,
          id: agentPm.id,
          isActive: agentPm.isActive,
          mobileNumber: agentPm.mobileNumber,
          fullName: agentPm.fullName,
          role: this.getRoleTitle(agentPm.role),
        };
      });
      callback(agentsVm);
    });
  };

  createAgent = async (agentDto, successCallback, errorCallback) => {
    let agentPm = {
      fullName: agentDto.fullName,
      email: agentDto.email,
      mobileNumber: agentDto.mobile,
      designation: agentDto.designation,
      role: agentDto.role,
      cascadeId: agentDto.location,
    };
    await agentsRepository.createAgent(agentPm, successCallback, errorCallback);
  };

  activateAgent = async (agentId) => {
    await agentsRepository.activateAgent(agentId);
  };

  deactivateAgent = async (agentId) => {
    await agentsRepository.deactivateAgent(agentId);
  };

  getRoleTitle = (role) => {
    switch (role) {
      case 'state-admin':
        return 'State Admin';
      case 'district-admin':
        return 'District Admin';
      case 'centralcommittee-admin':
        return 'Central Committee Admin';
      case 'district-agent':
        return 'Agent';
      case 'mandalam-agent':
        return 'Agent';
      case 'dispute-committee':
        return 'Dispute Committee';
    }
  };

  resetPassword = async (agentDto, successCallback, errorCallback) => {
    let agentPm = {
      id: agentDto.id,
      email: agentDto.email,
    };

    await agentsRepository.resetPassword(agentPm, successCallback, errorCallback);
  };
}
