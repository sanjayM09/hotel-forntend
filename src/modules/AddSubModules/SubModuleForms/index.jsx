import { CustomTabs } from '@components/others/CustomTabs';
import React, { useEffect, useState } from 'react'
import { ViewWorktype } from './Worktype/ViewWorktype';
import { CustomPageTitle } from '@components/others/CustomPageTitle';
import ViewCategory from './Category/ViewCategory';
import ViewFloor from './Floor/ViewFloor';
import ViewSpecifications from './Specification/ViewSpecifications';
import { useNavigate } from 'react-router-dom';
import ViewCity from './City/ViewCity';
import ViewCountry from './Country/ViewCountry';
import ViewState from './State/ViewState';
import ViewStayPurpose from './StayingPurpose/ViewStayPurpose';

export const SubmodulesMain = () => {
    const [active, setActive] = useState(1)
    const [tabPosition, setTabPosition] = useState("left");

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setTabPosition("top");
            } else {
                setTabPosition("left");
            }
        };

        // Initial check when the component mounts
        handleResize();

        // Listen for window resize events
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const items = [
        {
          key: '1',
          label: 'Work Type',
          children: <ViewWorktype active={active} />,
        },
        {
          key: '2',
          label: 'Category',
          children: <ViewCategory active={active} />,
        },
        {
          key: '3',
          label: 'Floor',
          children: <ViewFloor active={active} />,
        },
        {
          key: '4',
          label: 'Specification',
          children: <ViewSpecifications active={active} />,
        },
        {
          key: '5',
          label: 'City',
          children: <ViewCity active={active} />,
        },
        {
          key: '6',
          label: 'Country',
          children: <ViewCountry active={active} />,
        },
        {
          key: '7',
          label: 'State',
          children: <ViewState active={active} /> ,
        },
        {
          key: '8',
          label: 'Purpose of Stay',
          children: <ViewStayPurpose active={active} /> ,
        },
      ];
    return (
        <div>
            <CustomPageTitle Heading={'General Settings'} PreviousPage={() => navigate(-1)} />
            <CustomTabs tabPosition={tabPosition} items={items} defaultActiveKey={'1'} onChange={(e) => setActive(e)} />
        </div>
    )
}

