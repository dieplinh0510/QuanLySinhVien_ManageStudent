import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class LineChartData extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="idSemester" />
          <YAxis domain={[0, 4]} ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accumulatedPoint" name={'Học kỳ'} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
