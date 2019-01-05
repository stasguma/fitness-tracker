import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService
    ) { }

    fetchAvailableExercises() {
        this.uiService.loadingStateChange.next(true);
        this.fbSubs.push(this.db
            .collection<Exercise>('availableExercises')
            .snapshotChanges()
            .pipe(
                map((docArray) => docArray.map((doc) => {
                    const id = doc.payload.doc.id;
                    const data = doc.payload.doc.data() as Exercise;
                    return { id, ...data };
                }))
            )
            .subscribe((exercises: Exercise[]) => {
                this.uiService.loadingStateChange.next(false);
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            }, error => {
                this.uiService.loadingStateChange.next(false);
                this.uiService.showMessage('Fetching exercises failed, please try again later', null, 3000);
                this.exercisesChanged.next(null);
            })
        );
    }

    startExercise(selectedId: string) {
        // this.db.doc('availableExercises/' + selectedId)
        //     .update({ lastSelected: new Date() });
        this.runningExercise = this.availableExercises.find((ex) => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchComletedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishedExercisesChanged.next(exercises);
            })
        );
    }

    cancelSubsctiptions() {
        this.fbSubs.forEach((sub) => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
