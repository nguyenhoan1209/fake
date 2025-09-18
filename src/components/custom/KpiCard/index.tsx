import type { FC } from 'react';
import { KpiCardProps } from 'types/components';

import { Card, Col, Row } from 'antd';

export const KpiCard: FC<KpiCardProps> = ({ icon, value, description, className }) => {
  return (
    <Card className={`${className} rounded-sm`}>
      <Row align="middle" gutter={24}>
        <Col span={6} className="flex h-full w-full items-center justify-center">
          {icon}
        </Col>
        <Col span={18} className="flex flex-col gap-2">
          <div className="text-lg font-bold">{value}</div>
          <div className="font-semibold">{description}</div>
        </Col>
      </Row>
    </Card>
  );
};
