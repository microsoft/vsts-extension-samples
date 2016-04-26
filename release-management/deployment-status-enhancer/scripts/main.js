
VSS.ready(function () {
    var c = VSS.getConfiguration();
    c.onReleaseChanged(function (release) {

        $('#environments').empty();
        release.environments.forEach(function (env) {
            var state = 'State: ';
            var status = 'pending';

            switch (env.status) {
                case 0:
                    state += 'Unknown';
                    break;
                case 1:
                    state += 'Not Started';
                    break;
                case 2:
                    state += 'Pending';
                    break;
                case 3:
                    state += 'Succeeded';
                    status = 'succeeded';
                    break;
                case 4:
                    state += 'Rejected';
                    status = 'failed';
                    break;
                case 5:
                    state += 'In Progress';
                    status = 'running';
                    break;
                case 6:
                    state += 'Cancelled';
                    status = 'failed';
                    break;
                case 7:
                    state += 'Queued';
                    status = 'running';
                    break;
                default:
                    state += 'Unknown';
            };

            var p1 = $('<h2/>', {
                text: env.name
            });
            var p2 = $('<p/>', {
                text: state
            });

            var container = $('<div/>', {
                class: 'environment ' + status
            });

            container.append(p1);
            container.append(p2);
            $('#environments').append(container);
        });
    });
});