import { useState, useEffect } from 'react'
import { SaveOutlined } from '@ant-design/icons'

import { Select, Button, Avatar, Badge } from 'antd'
const { Option } = Select

const CourseCreateForm = ({
  handleSubmit,
  handleChange,
  handleImage,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove,
  editPage = false,
}) => {
  const children = []
  for (let i = 500; i <= 10000; i = i + 500) {
    children.push(<Option key={i}>{i}円</Option>)
  }
  return (
    <>
      {values && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="講座名"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="7"
              rows="7"
              value={values.description}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  value={values.paid}
                  onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
                >
                  <Option value={true}>有料</Option>
                  <Option value={false}>無料</Option>
                </Select>
              </div>
            </div>
            {values.paid && (
              <div className="form-group">
                <Select
                  defaultValue="500円"
                  style={{ width: '100%' }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="カテゴリー"
              value={values.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label className="btn btn-outline-secondary btn-block text-left">
                  {uploadButtonText}
                  <input
                    type="file"
                    name="name"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>

            {preview && (
              <Badge count="X" onClick={handleImageRemove} className="pointer">
                <Avatar width={200} src={preview} />
              </Badge>
            )}

            {editPage && values.image && (
              <Avatar width={200} src={values.image.Location} />
            )}
          </div>

          <div className="row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="btn btn-primary"
                icon={<SaveOutlined />}
                loading={values.loading}
                type="primary"
                size="large"
                shape="round"
              >
                {values.loading ? '保存中...' : '保存して続行'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default CourseCreateForm
