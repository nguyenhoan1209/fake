/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from 'antd';
import { Rule } from 'antd/es/form';
import { Gutter } from 'antd/lib/grid/row';
import { IFormBoxItem } from 'types/components';

import { cloneElement, isValidElement } from 'react';

const FormBoxItem = ({
  listItems,
  titleBox,
  defaultSpan = 8,
  classNameFormBox = '',
  columnGap = 16,
  rule,
  onFieldFocus,
}: {
  listItems: IFormBoxItem<any>[];
  titleBox?: string;
  defaultSpan?: number;
  classNameFormBox?: string;
  columnGap?: Gutter | [Gutter, Gutter];
  rule?: Rule;
  onFieldFocus?: (name: string) => void;
}) => {

  const form = Form.useFormInstance();

  return (
    <div className={classNameFormBox}>
      {titleBox && <div className="text-center text-xl font-semibold">{titleBox}</div>}
      <Row gutter={columnGap} className={titleBox ? 'px-3' : ''}>
        {listItems.map((item, index) => {
          let children = item.children;

          if (isValidElement(children) && item.name) {
            const prevOnFocus = children.props.onFocus;
            children = cloneElement(children, {
              onFocus: (e: any) => {
                // 🔄 Clear error automatically when focusing
                if (form && item.name) {
                  form.setFields([{ name: item.name, errors: [] }]);
                }
                if (onFieldFocus) onFieldFocus(item.name as string);
                if (prevOnFocus) prevOnFocus(e);
              },
            });
          }

          return (
            <Col span={item.span ?? defaultSpan} key={index}>
              {item.isFormItem === false ? (
                <>{children}</>
              ) : (
                <Form.Item
                  rules={item.rules ?? (rule ? [rule] : undefined)}
                  className={'mb-1 ' + (item.className || '')}
                  {...item}
                >
                  {children}
                </Form.Item>
              )}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default FormBoxItem;
