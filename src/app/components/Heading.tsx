'use client';

export type HeadingProps = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

const Heading: React.FC<HeadingProps> = ({ title, subTitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h3 className="text-2xl font-bold">{title}</h3>
      {subTitle && <p className="font-light text-nu mt-2">{subTitle}</p>}
    </div>
  );
};

export default Heading;
