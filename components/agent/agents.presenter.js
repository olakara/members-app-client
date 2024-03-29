import agentsRepository from './agents.repository';

export default class AgentsPresenter {
  load = async (callback, config) => {
    await agentsRepository.getAgents((agentsPm) => {
      if (!agentsPm.data) return;
      const { data } = agentsPm;
      const agents = data.items.map((agentPm) => {
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
      callback({ ...data, items: agents });
    }, config);
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
      case 'monitoring-officer':
        return 'Monitoring Officer';
      case 'central-dispute-admin':
        return 'Central Dispute Admin';
      case 'verification-officer':
        return 'Verification Officer';
      case 'member-viewer':
        return 'Members Viewer';
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
