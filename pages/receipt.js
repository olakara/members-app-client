/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MembersPresenter from '../components/member/members.presenter';

function ReceiptPage() {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const membersPresenter = new MembersPresenter();

  const [membership, setMembership] = useState('');

  useEffect(() => {
    async function load() {
      await membersPresenter.getMembershipDetails(id, (generatedViewModel) => {
        setMembership(generatedViewModel);
      });
    }

    load();
  }, []);

  return (
    <>
      <table id="Table_01" width="842" height="414" border="0" cellPadding="0" cellSpacing="0">
        <tr>
          <td colSpan="6">
            <img src="images/83_1_01.jpg" width="842" height="133" alt="" />
          </td>
        </tr>
        <tr>
          <td colSpan="4" rowSpan="4">
            <img src="images/83_1_02.jpg" width="644" height="68" alt="" />
          </td>
          <td>{membership.membershipId}</td>
          <td rowSpan="12">
            <img src="images/83_1_04.jpg" width="68" height="280" alt="" />
          </td>
        </tr>
        <tr>
          <td>
            <img src="images/83_1_05.jpg" width="130" height="10" alt="" />
          </td>
        </tr>
        <tr>
          <td>{membership.date}</td>
        </tr>
        <tr>
          <td>
            <img src="images/83_1_07.jpg" width="130" height="14" alt="" />
          </td>
        </tr>
        <tr>
          <td rowSpan="8">
            <img src="images/83_1_08.jpg" width="158" height="212" alt="" />
          </td>
          <td colSpan="4">{membership.fullName}</td>
        </tr>
        <tr>
          <td colSpan="4">
            <img src="images/83_1_10.jpg" width="616" height="15" alt="" />
          </td>
        </tr>
        <tr>
          <td>{membership.district}</td>
          <td rowSpan="6">
            <img src="images/83_1_12.jpg" width="135" height="177" alt="" />
          </td>
          <td colSpan="2">{membership.mandalam}</td>
        </tr>
        <tr>
          <td>
            <img src="images/83_1_14.jpg" width="257" height="15" alt="" />
          </td>
          <td colSpan="2">
            <img src="images/83_1_15.jpg" width="224" height="15" alt="" />
          </td>
        </tr>
        <tr>
          <td>{membership.emirate}</td>
          <td colSpan="2">{membership.area}</td>
        </tr>
        <tr>
          <td rowSpan="3">
            <img src="images/83_1_18.jpg" width="257" height="116" alt="" />
          </td>
          <td colSpan="2">
            <img src="images/83_1_19.jpg" width="224" height="69" alt="" />
          </td>
        </tr>
        <tr>
          <td colSpan="2">{membership.collectedBy}</td>
        </tr>
        <tr>
          <td colSpan="2">
            <img src="images/83_1_21.jpg" width="224" height="26" alt="" />
          </td>
        </tr>
        <tr>
          <td>
            <img src="images/spacer.gif" width="158" height="1" alt="" />
          </td>
          <td>
            <img src="images/spacer.gif" width="257" height="1" alt="" />
          </td>
          <td>
            <img src="images/spacer.gif" width="135" height="1" alt="" />
          </td>
          <td>
            <img src="images/spacer.gif" width="94" height="1" alt="" />
          </td>
          <td>
            <img src="images/spacer.gif" width="130" height="1" alt="" />
          </td>
          <td>
            <img src="images/spacer.gif" width="68" height="1" alt="" />
          </td>
        </tr>
      </table>
    </>
  );
}

export default ReceiptPage;
