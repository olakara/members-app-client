import agentsRepository from './agents.repository'

export default class AgentsPresenter {
    load = async (callback) => {
        await agentsRepository.getAgents(agentsPm => {
            const agentsVm = agentsPm.map(agentPm => {                
                return {
                    cascadeId: agentPm.cascadeId,
                    cascadeName: agentPm.cascadeName,
                    email: agentPm.email,
                    id: agentPm.id,
                    isActive: agentPm.isActive,
                    mobileNumber: agentPm.mobileNumber,
                    fullName: agentPm.fullName,
                }
            });
            callback(agentsVm);
        });
    }

    createAgent = async (agentDto, successCallback, errorCallback) => {

       let agentPm = {
        fullName: agentDto.fullName,
        email: agentDto.email,
        mobileNumber: agentDto.mobile,
        alternativeContactNumber: agentDto.alternateMobile,
        designation: agentDto.designation,
        role: agentDto.role,
        cascadeId: agentDto.location
      };
      await agentsRepository.createAgent(agentPm, successCallback, errorCallback);
    }

    activateAgent = async (agentId) => {
        await agentsRepository.activateAgent(agentId)
    }

    deactivateAgent = async (agentId) => {
        await agentsRepository.deactivateAgent(agentId)
    }

    
}
