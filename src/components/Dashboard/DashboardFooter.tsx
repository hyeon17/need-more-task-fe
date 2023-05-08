import React from 'react';
import * as D from '@/styles/dashboard.styles';
import draw from 'public/svg/draw.svg';
import github from 'public/svg/github.svg';
import figma from 'public/svg/figma.svg';
import Image from 'next/image';

const footerList = [
  {
    href: 'https://www.figma.com/file/qo8clI0VCTfBSxZKHhm7iM/Untitled?type=design&node-id=1-1393&t=5h1BIIUSjRV6d7MU-0',
    img: figma,
    alt: 'figmaSVG',
    span: 'Figma',
  },
  {
    href: 'https://github.com/orgs/MiniProject-2/repositories',
    img: github,
    alt: 'githubSVG',
    span: 'Github Repo',
  },
  {
    href: 'https://github.com/orgs/MiniProject-2/projects/2',
    img: github,
    alt: 'githubSVG',
    span: 'Github Projects',
  },
  {
    href: 'https://bush-cave-d86.notion.site/PLAN-00b115de6d9a44249e938612260a1845',
    img: draw,
    alt: 'drawSVG',
    span: 'API',
  },
];

function DashboardFooter() {
  return (
    <D.FooterContainer>
      <D.FooterLeft>
        <ul>
          {footerList.map(({ href, img, alt, span }) => (
            <li key={span}>
              <a href={href} target="_blank" rel="noreferrer">
                <Image src={img} alt={alt} />
                <span>{span}</span>
              </a>
            </li>
          ))}
        </ul>
      </D.FooterLeft>
      <D.FooterRight></D.FooterRight>
    </D.FooterContainer>
  );
}

export default DashboardFooter;
