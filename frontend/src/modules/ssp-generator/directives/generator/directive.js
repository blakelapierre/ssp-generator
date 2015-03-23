import _ from 'lodash';

module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    controller: ['$scope', $scope => {
      const result = {target: 0, sequence: []},
            {sequence} = result;

      $scope.generate = () => {
        const {sequenceLength, maxNumber} = $scope;

        if (maxNumber < sequenceLength) {
          alert('Max Number must be at least as great as Sequence Length');
          return;
        }

        sequence.splice(0, sequence.length);

        while (sequence.length < sequenceLength) {
          const candidate = Math.round(Math.random() * maxNumber);

          if (!_.contains(sequence, candidate)) {
            sequence.push(candidate);
          }
          else console.log(`generated ${candidate} more than once!`);
        }

        let numbersInTarget = Math.ceil(Math.random() * sequence.length),
            target = 0,
            used = {};

        while (numbersInTarget-- > 0) {
          let candidateIndex = Math.floor(Math.random() * sequence.length);

          if (!used[candidateIndex]) {
            used[candidateIndex] = true;
            target += sequence[candidateIndex];
          }
          else numbersInTarget++;
        }

        result.target = target;
      };

      $scope.sum = () => {
        let {candidate} = $scope;

        if (candidate.indexOf('[') !== 0) candidate = `[${candidate}]`;

        try {
          candidate = JSON.parse(candidate);

          $scope.candidateSum = _.reduce(candidate, (result, c) => { return result + c; });
          $scope.candidateError = false;
        }
        catch (e) {
          $scope.candidateError = true;
        }
      };

      $scope.verify = () => {
        const {candidateSum, result: {target}} = $scope;

        console.log(candidateSum, target);

        if (candidateSum === target) alert('Congratulations!');
        else alert('Nope! Why did you think that was the answer?');
      };

      $scope.maxNumber = 10e6;
      $scope.sequenceLength = 1000;

      $scope.result = result;
    }]
  };
};